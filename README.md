# Weather App - Next.js
 

<br />

Um app Next.JS que renderiza informações do tempo de cidades ao redor do mundo utilizando a API Open Weather (https://openweathermap.org/), passando alguns parâmetros definir o retorno dos dados.:[^1]

<br />

Abaixo temos um exemplo da requisição à API Open Weather em que passamos 5 parâmetros, um deles o valor do token de inscrição no site da API. Outros valores dizem respeito:

1. Latitude 
2. Longitude
3. Medida de unidade
4. Redução na quantidade de dados retornados  


```
`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${the-value-from-the-API-KEY-here}&units=metric&exclude=minutely`
```


<br />


- [my Next-JS Blog App em Vercel](https://nextjs-weather-app-dun.vercel.app/)


<br />

Dependências:

- Next-JS
- React-JS
- Sass
- Dotenv
- Moment
- Moment-timezone
- Nprogress



<br />


### Imagem da Home Page do Weather App:

![Imagem da Home Page do Weather App](/public/images/nextjs-weather-app-01.png)


<br />


### Imagem do sistema de pesquisa do app:

![Imagem do sistema de pesquisa do app](/public/images/nextjs-weather-app-02.png)


<br />


### Imagem da página de uma cidade para o Weather App:

![Imagem da página de uma cidade para o Weather App](/public/images/nextjs-weather-app-03.png)






<br />

<br />
<br />


[^1]: Matt The Dev - Youtube 
