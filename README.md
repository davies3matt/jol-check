# jol-check
A multi-user To-Do/Check list tracker app 

# Getting Started

After cloning the repo run `amplify init` using IAM credentials to authenticate

run `amplify codegen` to generate types, queries, mutations and subscriptions

Finally run `yarn start` to launch the Expo Environment 

# Frontend

The frontend is built on the Expo framework, which is built around React Native.

It is written in Typescript - which is a superset of Javascript, it adds a ton of features including better stability as opposed to vanilla Javascript.

## Expo
Expo is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase.

# Backend

The resource orchestration tool of choice is AWS Amplify - this handles a lot of the heavy lifting when it comes to the deployment of backend resources.