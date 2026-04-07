import { FastifyInstance } from 'fastify'

const songs = [
  {
    id: '1',
    name: 'Night City',
    artist: 'R E L and Artemis Delta',
    album: 'Cyberpunk 2077: Radio, Vol. 3 (Original Soundtrack)',
    year: 2020,
    durationInSeconds: 194,
    explicit: false,
    url: '/music/Night City.mp3',
  },
  {
    id: '2',
    name: "Chippin' In",
    artist: 'Damian Ukeje, P.T. Adamczyk and Kerry',
    album: 'Cyberpunk 2077: Radio, Vol. 3 (Original Soundtrack)',
    year: 2020,
    durationInSeconds: 216,
    explicit: true,
    url: "/music/Chippin' In.mp3",
  },
  {
    id: '3',
    name: 'Kill the Messenger',
    artist: 'Rezodrone and The Cartesian Duelists',
    album: 'Cyberpunk 2077: More Music from Night City Radio (Original Soundtrack)',
    year: 2021,
    durationInSeconds: 209,
    explicit: false,
    url: '/music/Kill the Messenger.mp3',
  },
  {
    id: '4',
    name: 'Resist and Disorder',
    artist: 'Rezodrone and The Cartesian Duelists',
    album: 'Cyberpunk 2077: Radio, Vol. 3 (Original Soundtrack)',
    year: 2020,
    durationInSeconds: 257,
    explicit: false,
    url: '/music/Resist and Disorder.mp3',
  },
  {
    id: '5',
    name: 'Infiltrator',
    artist: 'Daniel Deluxe',
    album: 'Ghostrunner (Original Soundtrack)',
    year: 2020,
    durationInSeconds: 211,
    explicit: false,
    url: '/music/Infiltrator.mp3',
  },
  {
    id: '6',
    name: 'I Really Want to Stay at Your House',
    artist: 'Rosa Walton & Hallie Coggins',
    album: 'Cyberpunk 2077: Radio, Vol. 2 (Original Soundtrack)',
    year: 2020,
    durationInSeconds: 247,
    explicit: true,
    url: '/music/I Really Want to Stay at Your House.mp3',
  },
  {
    id: '7',
    name: 'Let You Down',
    artist: 'Dawid Podsiadło',
    album: 'Cyberpunk: Edgerunners (Original Series Soundtrack)',
    year: 2023,
    durationInSeconds: 227,
    explicit: false,
    url: '/music/Let You Down.mp3',
  },
  {
    id: '8',
    name: 'Never Fade Away (SAMURAI Cover)',
    artist: 'P.T. Adamczyk (feat. Olga Jankowska)',
    album: 'Never Fade Away (SAMURAI Cover)',
    year: 2020,
    durationInSeconds: 287,
    explicit: false,
    url: '/music/Never Fade Away (feat. Olga Jankowska) (SAMURAI Cover).mp3',
  },
]

export const registerEndpoints = async (fastify: FastifyInstance) => {
  fastify.get('/songs', async () => songs)

  fastify.get('/', async () => 'Player Backend OK')
}
