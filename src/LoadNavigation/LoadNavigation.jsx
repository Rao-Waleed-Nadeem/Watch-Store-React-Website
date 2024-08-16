import { useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

const LoadingNavigation = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(navigation.state === "loading");
  }, [navigation.state]);

  return { loading };
};

export default LoadingNavigation;
