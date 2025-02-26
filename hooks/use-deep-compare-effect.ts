import { useEffect, useRef } from "react";
import isEqual from "lodash-es/isEqual";

type Callback = () => void;
type Dependencies = any[];

export default function useDeepCompareEffect(
  callback: Callback,
  dependencies: Dependencies
) {
  const currentDependenciesRef = useRef<Dependencies>();

  useEffect(() => {
    if (!isEqual(currentDependenciesRef.current, dependencies)) {
      callback();
    }
    currentDependenciesRef.current = dependencies;
  });
}
