import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  price_abc: number,
  price_def: number,
  trigger_point: number | undefined,
  upper_bound: number,
  lower_bound: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
    const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price_abc / price_def;
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;
    return {
      price_abc: price_abc,
      price_def: price_def,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      trigger_point: (ratio > upper_bound || ratio < lower_bound) ? ratio: undefined,
    };
  }
}
