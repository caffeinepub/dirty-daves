import { useEffect, useState } from 'react';
import { useActor } from './useActor';

export interface BackendHealthCheckResult {
  healthStatus: 'idle' | 'checking' | 'healthy' | 'unhealthy';
  error: string | null;
  isHealthy: boolean;
  isChecking: boolean;
  backendCanisterId: string | null;
  backendServerTimestamp: bigint | null;
  deploymentInfoError: string | null;
}

/**
 * Enhanced backend connectivity check that runs once on app load.
 * Calls testConnection to verify canister communication and getDeploymentInfo
 * to fetch backend identity (canister ID, server timestamp).
 * Emits a single clearly labeled diagnostic console line per check.
 */
export function useBackendHealthCheck(): BackendHealthCheckResult {
  const { actor, isFetching } = useActor();
  const [healthStatus, setHealthStatus] = useState<'idle' | 'checking' | 'healthy' | 'unhealthy'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [backendCanisterId, setBackendCanisterId] = useState<string | null>(null);
  const [backendServerTimestamp, setBackendServerTimestamp] = useState<bigint | null>(null);
  const [deploymentInfoError, setDeploymentInfoError] = useState<string | null>(null);

  useEffect(() => {
    if (!actor || isFetching || healthStatus !== 'idle') {
      return;
    }

    const checkHealth = async () => {
      setHealthStatus('checking');
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
      
      try {
        // First check basic connectivity
        const result = await actor.testConnection();
        if (result !== 'test') {
          setHealthStatus('unhealthy');
          const errorMsg = 'Unexpected response from backend';
          setError(errorMsg);
          console.error(
            `[Backend Health Check] ❌ Connection failed on ${hostname}: ${errorMsg} (received: ${result})`
          );
          return;
        }

        // Then fetch deployment info
        try {
          const deploymentInfo = await actor.getDeploymentInfo();
          setBackendServerTimestamp(deploymentInfo.canisterTime);
          
          // Extract canister ID from actor
          const actorCanisterId = (actor as any)._canisterId?.toString() || 'unknown';
          setBackendCanisterId(actorCanisterId);
          
          setHealthStatus('healthy');
          
          // Single labeled diagnostic line with all key info
          const buildVersion = import.meta.env.VITE_BUILD_VERSION || 'dev';
          const buildTimestamp = import.meta.env.VITE_BUILD_TIMESTAMP || 'unknown';
          console.log(
            `[Backend Health Check] ✅ Connection successful | Host: ${hostname} | Backend Canister: ${actorCanisterId} | Build: ${buildVersion} @ ${buildTimestamp}`
          );
        } catch (deployErr: any) {
          // Connection works but deployment info failed
          const deployErrMsg = deployErr?.message || 'Failed to fetch deployment info';
          setDeploymentInfoError(deployErrMsg);
          setHealthStatus('healthy'); // Still mark as healthy since testConnection worked
          console.warn(
            `[Backend Health Check] ⚠️ Connection OK but deployment info unavailable on ${hostname}: ${deployErrMsg}`
          );
        }
      } catch (err: any) {
        setHealthStatus('unhealthy');
        const errorMsg = err?.message || 'Unknown error';
        setError(errorMsg);
        console.error(
          `[Backend Health Check] ❌ Connection failed on ${hostname}: ${errorMsg}`
        );
      }
    };

    checkHealth();
  }, [actor, isFetching, healthStatus]);

  return {
    healthStatus,
    error,
    isHealthy: healthStatus === 'healthy',
    isChecking: healthStatus === 'checking',
    backendCanisterId,
    backendServerTimestamp,
    deploymentInfoError,
  };
}
