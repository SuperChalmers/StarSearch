import axios from 'axios';

export interface UpdateDroneRequest {
    action: string,
    detail: string
}

// Create a simulation
export async function updateDrone(droneId: number, droneRequest: UpdateDroneRequest) {
    return await axios.put(`/drone/${droneId}`, droneRequest); 
}
