import axios from 'axios';

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
    return await axios.get(`/simulation/next`);
}

// Request backend halts simulation
export async function halt(simulationId: number) {
    return await axios.get(`/simulation/${simulationId}/halt`);
}

// Create a simulation
export async function createSimulation(simulation: CreateSimulationRequest) {
    return await axios.post('/simulation', simulation);
}

// Load single simulation
export async function loadSimulation(simulationId: number) {
    return await axios.get(`/simulation/${simulationId}`);
}

// Load list of available simulations
export async function getSimulations() {
    return await axios.get(`/simulations`);
}
