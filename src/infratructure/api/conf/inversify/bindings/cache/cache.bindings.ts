import { Container } from "inversify";
import { CACHE_IOC_IDS } from "../../../../../@shared/constants/cache.ioc.identifiers";
import { CacheShared, ICache } from "../../../../../@shared/cache/cache.shared";

export default (container: Container): Container => {
  container.bind<ICache>(CACHE_IOC_IDS.CACHESHARED).to(CacheShared).inSingletonScope();
  
  return container;
};
