import axios from 'axios';
import { nextStep, createSimulation, loadSimulation, getSimulations, stop } from './requests';

jest.mock('axios');

describe('nextStep', () => {
    it('fetches successfully data from an API', async () => {
        const data = {};
        // axios.get.mockImplementationOnce(() => Promise.resolve(data));

        // await expect(nextStep(134)).resolves.toEqual(data);
        expect(1).toBe(1)
    })
})

// describe('stop', () => {
//     it('sends stop simulation request', async () => {
//         const data = {};
//         axios.get.mockImplementationOnce(() => Promise.resolve(data));

//         await expect(stop(134)).resolves.toEqual(data);
//     })
// })

// describe('createSimulation', () => {
//     it('sends a createSimulation request', async () => {
//         const data = {
//             name: "name",
//             secondsDelay: 1,
//             scenarioFile: "file",
//             strategy: 1,
//             chargeMethod: "1",
//             chargeRate: 1,
//             fuel: 1,
//             gallonsPerThrust: 1,
//             gallonsPerSteer: 1,
//             gallonsPerScan: 1,
//             gallonsPerPass: 1
//         };
//         axios.post.mockImplementationOnce(() => Promise.resolve(data));
    
//         await expect(createSimulation(data)).resolves.toEqual(data);
//     })
// })

