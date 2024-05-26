import requests
from collections import Counter

def get_movie_info(movie_name, api_key):
    base_url = "https://api.themoviedb.org/3/search/movie"

    params = {
        "api_key": api_key,
        "query": movie_name
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        movie_data = response.json()
        if movie_data["total_results"] > 0:
            movie = movie_data["results"][0]
            return movie
        else:
            print("Nenhum filme encontrado com esse nome.")
            return None
    else:
        print("Erro ao acessar a API do TMDb:", response.status_code)
        return None

genres_liked = []

while True:
    movie_name = input("Digite o nome do filme para escolhermos um parecido!: ")

    api_key = "3ff4072b75064bdf15ea858de42bda23"

    movie_info = get_movie_info(movie_name, api_key)
    if movie_info:
        print("Informações do Filme:")
        print(movie_info['genre_ids'])
        for i in movie_info['genre_ids']:
            genres_liked.append(i)
        print(genres_liked)
    else:
        print("Não foi possível encontrar informações sobre o filme.")
    
    escolha = input('Deseja continuar [S/N]: ')
    if escolha == 'N':
        break
    else:
        continue

genre_counts = Counter(genres_liked)

most_liked_genre = genre_counts.most_common(1)

print("O gênero mais comum é:", most_liked_genre[0][0])

base_url = "https://api.themoviedb.org/3/discover/movie"

params = {
    "api_key": api_key,
    "with_genres": most_liked_genre[0][0],
    "sort_by": "popularity.desc"
}

response = requests.get(base_url, params)

if response.status_code == 200:
    movie_data = response.json()
    print("Filmes com o gênero mais comum:")
    for movie in movie_data["results"]:
        print(movie["title"])
else:
    print("Erro ao acessar a API do TMDb:", response.status_code)