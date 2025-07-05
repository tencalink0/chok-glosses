# chok-glosses
The ultimate language learning framework for passionate language learners.

## Deploy
1. Clone the repository: ``` git clone https://github.com/tencalink0/chok-glosses.git ```
2. Install all packages: ``` npm install ```
3. Check everything is as you like (if unsure, leave it)
4. Run:
    - Locally: ``` npm run dev ```
    - Production: ``` npm run build:express && npm run start:express ```
    - Deno Production (not preferred): ``` npm run build:deno && npm run start:deno ```
## Features
### Live Features
- Flashcard and Reading section
- Progress path
- Practice section
- Local Storage course storing
- JSON course uploads
- ZOD Schema checks to validate casting
### Planned Features
- .lbsv support
- **Listening** and **Reading** section
- Online features: (would be powered off ad revenue)
    - Login
    - Online, live courses
    - In game currency
    - **Friendly** Flashcard battles
- Reversable courses
- Custom scripting for referencing images and audio files
- More color presets!!!

## Dev Help
### Creating courses
When you decide to create courses, you can either create them manually or get an AI to write them for you. If you decide to use AI, refer to the /prompts folder for a template of how to instruct the AI to write the course for you.

When assigning a color to a Level, you can either add the color as a string, or add a custom color:
| Color | Hex |
| -- | -- |
| --red | #ffddee |
| --green | #d0f0c0 |
| --purple | #c1c1f4 |
| --orange | #f8d7b5 |
| --yellow | #fff9c4 |
|  --blue | #cce5ff |

### ------------ Planned ------------
### LocalStorage 
For storing audio tracks and image, they are stored as "|file", with a "|" infront. This is used for preventing them having reserved names.

## Extra Info & Disclamer
### Creators
The project was written by [tencalink0](https://github.com/tencalink0) and [bev29rr](https://github.com/bev29rr). 

### Tech Stack
- Typescript
- React
- NodeJS

### AI Uses
AI was used for minor bug fixing and created a large chunk of the sample courses.