import { WsModelEndPoints } from './WsModelAbstractService';

export function WsModelService(model: string) {
  return function (target: any) {
    Object.defineProperties<string>(target.prototype, {
      model: {
        value: {
          watch: `/topic/${model}`,
          add: `/app/${model}.add`,
          delete: `/app/${model}.delete`,
          save: `/app/${model}.save`,
        } as WsModelEndPoints,
      },
    });
  };
}
