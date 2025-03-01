import { Model } from '../model/model';

const distributeModelTransformLogic = <M extends Model>(
  modelOrModelList: M[] | M,
  logic: (model: M) => M
): M[] | M => {
  if (Array.isArray(modelOrModelList)) {
    return modelOrModelList.map((model: M) => logic(model));
  }
  return logic(modelOrModelList);
};

export const Utils = {
  distributeModelTransformLogic,
};
