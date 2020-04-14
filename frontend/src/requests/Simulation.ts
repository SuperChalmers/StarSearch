import axios from 'axios';


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

export interface CreateSimulationRequest {
    name: string,
    secondsDelay: number,
    scenarioFile: string,
    strategy: number,
    chargeMethod: string,
    chargeRate: number,
    fuel: number,
    gallonsPerThrust: number,
    gallonsPerSteer: number,
    gallonsPerScan: number,
    gallonsPerPass: number
}

// Request backend executes next step
export async function nextStep() {
    var response = await instance.get(`/simulation/next`);
    return response.data;
}

// Request backend stop simulation
export async function stop(simulationId: number) {
    return await axios.get(`/simulation/stop`);
}

// Create a simulation
export async function createSimulation(simulation: CreateSimulationRequest) {
    var response =  await instance.post('/simulation', simulation);
    return response.data;
}

// Load single simulation
export async function loadSimulation(simulationId: number) {
    return await axios.get(`/simulation/${simulationId}`);
}

// Load list of available simulations
export async function getSimulations() {
    return await axios.get(`/simulations`);
}
