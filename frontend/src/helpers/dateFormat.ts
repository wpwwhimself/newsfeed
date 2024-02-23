import moment from "moment";

export const date = (input: string) => moment(input).format("D.MM.YYYY H:mm")