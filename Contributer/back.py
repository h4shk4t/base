from flask import Flask, request, jsonify
import json
import requests


token = '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'
def github_request ( url , params = None) :
    print(url,params)
    headers = { 'Authorization': f'token {token}' }
    response = requests.get(url,headers=headers,params=params)
    if response.status_code != 200 : print(response.text) ; return None
    return response

def get_commit_map ( username , repository ) :
    url = f'https://api.github.com/repos/{username}/{repository}/commits'

    all_commits = []
    page = 1
    per_page = 100

    while True:
        response = github_request(url, params={'page': page, 'per_page': per_page})
        if not response : break
        commits = response.json()
        if not commits: break
        all_commits.extend(commits) 
        page += 1

    M = {}
    for commit in all_commits:
        if not commit or not commit["author"] : continue 
        s = commit["author"]["login"]
        if s not in M : M[s] = 0
        M[s] += 1
    
    return M

def get_all_followers ( username ) :
    url = f'https://api.github.com/users/{username}/followers'

    all_followers = []
    page = 1
    per_page = 100

    while True:
        response = github_request(url,params={'page': page, 'per_page': per_page})
        if not response : break
        followers = response.json()
        if not followers: break   
        all_followers.extend(followers)
        page += 1
    
    S = set()
    # Print all fetched followers
    for follower in all_followers:
        S.add(follower["login"])

    return S

def get_all_following ( username ) :
    url = f'https://api.github.com/users/{username}/following'

    all_followers = []
    page = 1
    per_page = 100

    while True:
        response = github_request(url,params={'page': page, 'per_page': per_page})
        if not response : break
        followers = response.json()
        if not followers: break   
        all_followers.extend(followers)
        page += 1
    
    S = set()
    # Print all fetched followers
    for follower in all_followers:
        S.add(follower["login"])

    return S

def get_last_commit_hash ( username , repository ) :
    url = f'https://api.github.com/repos/{username}/{repository}/commits'
    headers = { 'Authorization': f'token {token}' }

    page = 1
    per_page = 1

    
    response = github_request(url, params={'page': page, 'per_page': per_page})
    if not response : return None
    commit = response.json()[0]['sha']
    return commit

def get_first_commit_hash(owner, repo):
    base_url = 'https://api.github.com'
    url = '{}/repos/{}/{}/commits'.format(base_url, owner, repo)
    headers = { 'Authorization': f'token {token}' }
    req = github_request(url)
    if not req : return None
    json_data = req.json()

    if req.headers.get('Link'):
        page_url = req.headers.get('Link').split(',')[1].split(';')[0].split('<')[1].split('>')[0]
        req_last_commit = github_request(page_url)
        if not req_last_commit : return None
        first_commit = req_last_commit.json()
        first_commit_hash = first_commit[-1]['sha']
    else:
        first_commit_hash = json_data[-1]['sha']
    
    return first_commit_hash

def get_all_commits_count(owner, repo ):

    first_commit = get_first_commit_hash(owner, repo)
    last_commit = get_last_commit_hash(owner,repo)
    if not first_commit or not last_commit : return None
    base_url = 'https://api.github.com'
    compare_url = '{}/repos/{}/{}/compare/{}...{}'.format(base_url, owner, repo, first_commit, last_commit)

    headers = { 'Authorization': f'token {token}' }
    commit_req = github_request(compare_url)
    if not commit_req : return None

    commit_count = commit_req.json()['total_commits'] + 1

    return commit_count

def get_all_repos ( username ) :

    username = 'base-org' 
    url = f'https://api.github.com/users/{username}/repos'
    headers = { 'Authorization': f'token {token}' }

    all_repos = []
    page = 1
    per_page = 100  # Maximum per page is 100

    while True:
        response = github_request(url,params={'page': page, 'per_page': per_page})
        if not response : break
        repos = response.json()
        if not repos: break   
        all_repos.extend(repos)
        page += 1

    S = set()
    for repos in all_repos : S.add(repos["name"])
    return S


def get_eligible_map (user) :

    Eligible = {}

    S = get_all_repos(user)

    for s in S :
        commit_count = get_all_commits_count(user,s)
        if commit_count > 999 : continue
        print(s)
        E = get_commit_map(user,s)
        for e in E : 
            if e not in Eligible : Eligible[e] = 0
            Eligible[e] += E[e]


    S= set()
    for el in Eligible :
        if Eligible[el] >= 30 : S.add(el)   
    for i in range ( 1 ) :
        SS = set()
        for s in S :
            F = get_all_following(s)
            for f in F :
                if f in Eligible : continue 
                Eligible[f] = 0
                SS.add(f)
        S = SS
    
    return Eligible

app = Flask(__name__)

@app.route('/')
def home():
    return "Query using /api/contributor"

@app.route('/api/contributors', methods=['POST'])
def process_data():
    data = request.get_json()
    username = str(data["username"])
    print(username)

    Eligible = -1

    S = get_all_repos(username)
    L = "@".join(sorted(list(S)))
    print(L)
    print(len(L))

    filename = 'data.json'
    with open(filename, 'r') as json_file:
        data = json.load(json_file)
        if "name" in data and data["name"] == username :
            Eligible = data["eligible"]
    
    if Eligible == -1 :    
        Eligible = get_eligible_map(username)
        data = { "name":username , "eligible":Eligible }
        with open(filename, 'w') as json_file:
            json.dump(data, json_file, indent=4)
    
    return jsonify(Eligible)

if __name__ == '__main__':
    app.run(debug=True) 