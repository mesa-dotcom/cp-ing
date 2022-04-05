import { DeviceType } from "../enums";

export interface Device {
    type: DeviceType,
    No: number | null,
    ip: string
}
