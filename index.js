const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Ville {
    nom: String
    superficie: Int
    nombreDhabitant: Int
    nomDuMaire: String
    departement: String
  }
  type Query {
    ville: [Ville]
    villeByName(nom: String!): Ville
    villeByDepartement(departement: String!): [Ville]
  }
 
`;

const ville = [
  {
    nom: "Paris",
    superficie: 105444,
    nombreDhabitant: 2161,
    nomDuMaire: "Yasmine",
    departement: "ile de france",
  },
  {
    nom: "Toulouse",
    superficie: 300000,
    nombreDhabitant: 10000,
    nomDuMaire: "Alex",
    departement: "Haute-Garonne",
  },
  {
    nom: "Nice",
    superficie: 30000,
    nombreDhabitant: 10000,
    nomDuMaire: "Jack",
    departement: "Provence-Alpes-Côte d'Azur",
  },
];

const resolvers = {
  Query: {
    ville: () => ville,
    villeByName(parent, args, context, info) {
      return ville.find((ville) => ville.nom === args.nom);
    },
    villeByDepartement(parent, args, context, info) {
      return ville.filter((ville) => ville.departement === args.departement);
    },
  },
};

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
