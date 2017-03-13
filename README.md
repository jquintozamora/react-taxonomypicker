# react-taxonomypicker
Office 365 / SharePoint Taxonomy Picker built in React and TypeScript

## Requirements
- Promise - be sure it has been polyfilled for IE.

## Supported scenarios
- SharePoint Web Part using Script Editor or Content Editor Web Part

## No Supported scenarios
- SharePoint App (Provider-hosted app)
- Other environment not using SP.js (JSOM)
- Add new terms to the Taxonomy Store (specific for get terms by now)

## Done
- Expose as a Module / Global / UMD library
- Upload to npm
- Create ES6 sample application for usage
- Create TypeScript sample application for usage
- Create types and include them with the npm package

## TODOs
- Create types to allow people include with @types
- Add logic to disable Mock API and enable Data input when not SP or Taxonomy detected
- Create SPFx webpart sample for usage
- Expose more functions for handlers
- Create and Expose property to disable Async / Synch detection
- Create and Expose properties for custom styles


## License
MIT License

Copyright (c) 2017 José Quinto (https://blog.josequinto.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
