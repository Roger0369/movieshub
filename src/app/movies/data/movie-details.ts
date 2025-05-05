export interface Movie {
  name: string;
  description: string;
  director: string;
  cast: string;
  releaseDate: string;
  image: string;
  suggestions: string[]; 
}

export const movieDetails: { [key: string]: Movie } = {
  madmaxfuryroad: {
    name: 'Mad Max: Fury Road',
    description: 'La película destaca por su acción coreografiada magistralmente y efectos prácticos impresionantes. Tom Hardy interpreta al solitario Max, mientras que Charlize Theron brilla como la valiente Furiosa. El mundo desértico es brutal, visualmente asombroso y cargado de simbolismo. George Miller entrega una historia poderosa sobre redención, resistencia y libertad. Una obra maestra moderna del cine de acción, audaz y visualmente inolvidable.',
    director: 'George Miller',
    cast: 'Tom Hardy, Charlize Theron, Nicholas Hoult, Hugh Keays-Byrne',
    releaseDate: '15 de mayo de 2015',
    image: 'assets/madmax_furyroad.webp',
    suggestions: ['deadpool', 'johnwick', 'mickey17'],
  },
  deadpool: {
    name: 'Deadpool',
    description: 'Deadpool, dirigida por Tim Miller y protagonizada por Ryan Reynolds, es una película que revolucionó el género de superhéroes con su enfoque irreverente y humorístico. Lanzada en 2016, se distingue por su tono satírico, su humor negro y su ruptura de la cuarta pared, ofreciendo una experiencia cinematográfica única. La película cuenta la historia de Wade Wilson, un ex-militar y mercenario que, tras someterse a un experimento para curar su cáncer, adquiere habilidades regenerativas y se convierte en Deadpool.',
    director: 'Tim Miller',
    cast: 'Ryan Reynolds, Morena Baccarin, Ed Skrein',
    releaseDate: '12 de febrero de 2016',
    image: 'assets/deadpool.webp',
    suggestions: ['madmaxfuryroad', 'johnwick', 'mickey17'],
  },
  johnwick: {
    name: 'John Wick',
    description: 'La película comienza presentándonos a John Wick, un hombre sumido en la tristeza tras la muerte de su esposa. Su mundo solitario recibe un breve destello de esperanza cuando recibe un cachorro, Daisy, un regalo póstumo de su esposa. Pero esta paz es efímera. El tranquilo inicio se rompe abruptamente cuando Iosef, el hijo arrogante de un mafioso ruso, se cruza en su camino. Atraído por el coche de John, Iosef lo asalta en su casa, robándole el coche y matando a Daisy. Este acto despierta al asesino que John había dejado atrás. Descubrimos que John Wick no es un hombre común, sino un exasesino temido en el mundo criminal. Consumido por la venganza, John se lanza en una implacable búsqueda de Iosef.',
    director: 'Chad Stahelski',
    cast: 'Keanu Reeves, Michael Nyqvist, Alfie Allen, Willem Dafoe',
    releaseDate: '24 de octubre de 2014',
    image: 'assets/johnwick.webp',
    suggestions: ['deadpool', 'madmaxfuryroad', 'mickey17'],
  },
  mickey17: {
    name: 'Mickey 17',
    description: 'Mickey 17 sigue la historia de Mickey, un hombre que trabaja como un "explorador" en una misión de colonización en un planeta distante. En el futuro, la humanidad se ha expandido más allá de la Tierra y ha comenzado a colonizar planetas lejanos. Mickey, en su rol de explorador, es una especie de “sacrificio humano”, enviado a realizar tareas extremadamente peligrosas que muchos no sobrevivirían. Lo peculiar de su situación es que, cuando Mickey muere, se le "resucita" en un nuevo cuerpo, gracias a la clonación, y se le envía de nuevo al mismo trabajo. El dilema de Mickey radica en las implicaciones filosóficas de este proceso: ¿qué significa ser uno mismo cuando eres replicado una y otra vez? A lo largo de la película, Mickey empieza a cuestionar su identidad, el propósito de su existencia y el dolor inherente a su situación.',
    director: 'Bong Joon-ho',
    cast: 'Robert Pattinson, Naomi Ackie, Steven Yeun, Toni Collette',
    releaseDate: '28 de febrero de 2025',
    image: 'assets/mickey17.webp',
    suggestions: ['madmaxfuryroad', 'johnwick', 'deadpool'],
  }
};
