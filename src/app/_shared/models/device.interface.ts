import { DeviceType } from "../enums";

export interface Device {
    type: DeviceType,
    no: number | null | undefined,
    ip: string
}
