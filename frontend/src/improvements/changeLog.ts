import { Category, ChangeLog, Status } from './changeLog.types';

export const changeLog: ChangeLog[] = [
  {
    category: Category.performance,
    issue: 'Signature Generation',
    description:
      'Generating a signature during each data fetch introduces performance overhead.',
    solution: `
    The signature generation process has been moved to a reusable module. 
    This module generates and stores the signature at the time of data generation, 
    as the data remains mostly static after the initial creation. The same module is used during API data fetches, 
    with conditional logic to either retain or force re-generation of the signature when necessary.
    `,
    status: Status.complete,
  },
  {
    category: Category.performance,
    issue: 'API Response with Large Dataset',
    description: `
    Fetching a large dataset with every request places a significant burden on the server, 
    increases network load, and slows down client-side data processing, resulting in higher response times during each render.`,
    solution: `
    To address these issues, several optimizations were introduced. 
    Pagination was implemented to break down the large dataset into smaller, more manageable chunks, 
    reducing the amount of data sent per request. Optional caching was added to 
    store frequently accessed data, reducing repeated fetches. 
    Gzip compression was enabled during data transit to minimize payload size and 
    improve transfer speed. Additionally, a maximum page limit was enforced to further ensure fast and efficient API responses.`,
    status: Status.complete,
  },
  {
    category: Category.practices,
    issue: 'Backend Project Structure and Functionalities',
    description:
      'The original project structure did not follow best practices and was difficult to maintain.',
    solution: `
    The backend project was refactored to follow 3-tier architecture, a more organized and maintainable structure. 
    Key components such as router, cache, database, environment configurations, types, utilities, 
    and signature modules were modularized for improved readability and maintainability. 
    For example, the database module now supports dynamic query mapping, which helps eliminate 
    code duplication and simplifies the creation of query variations. This new structure ensures that the project 
    is more scalable and adheres to industry best practices.
      `,
    status: Status.complete,
  },
  {
    category: Category.practices,
    issue: 'Frontend Project Structure and Functionality',
    description: `
    The initial project structure did not adhere to best practices, making it difficult to maintain. 
    Key elements like layout, navigation, and reusable components were missing.`,
    solution: `
    The frontend project was updated with a well-structured layout, 
    incorporating additional pages and components to support new features in a lean way. 
    These updates include features such as asset listing, implemented using two approaches: 
    1) pagination and 2) infinite loading. The original page was also updated to demonstrate maximum 
    page limit enforcement. Additionally, the home page was improved with a changelog to 
    track updates and modifications. This refactoring aligns the project with best practices, 
    ensuring better maintainability and scalability.`,
    status: Status.complete,
  },
  {
    category: Category.practices,
    issue: 'Frontend Async JSX Component Support',
    description: `
    The initial project typescript version didn't support async JSX server components.`,
    solution: `
    The frontend project was updated latest version of the typescript and @types/react packages to support async JSX server components.`,
    status: Status.complete,
  },
  {
    category: Category.practices,
    issue: 'Frontend Page Caching and Logging Issue',
    description: `
    The NextJs version (14) on the initial project didn't support latest caching updates and logging.`,
    solution: `
    The project was updated to the latest NextJs 15 version and the required logging enabled and caching was verified.`,
    status: Status.complete,
  },
];
