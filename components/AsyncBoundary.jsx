import React from 'react';
import { setSimulateError } from '../services/api';
import { Loading, ErrorView } from './StateView';

// Menangani loading dan error; jika sukses, render children(data).
export default function AsyncBoundary({ state, children }) {
  if (state.loading) return <Loading />;
  if (state.error) {
    return (
      <ErrorView
        message={state.error.message}
        onRetry={() => { setSimulateError(false); state.reload(); }}
      />
    );
  }
  return children(state.data);
}
