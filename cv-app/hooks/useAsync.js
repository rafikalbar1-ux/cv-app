import { useCallback, useEffect, useState } from 'react';

// Hook pengambilan data: mengelola status loading, error, dan data.
export default function useAsync(fn) {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const run = useCallback(() => {
    setState({ loading: true, error: null, data: null });
    fn()
      .then((data) => setState({ loading: false, error: null, data }))
      .catch((error) => setState({ loading: false, error, data: null }));
  }, [fn]);
  useEffect(() => { run(); }, [run]);
  return { ...state, reload: run };
}
