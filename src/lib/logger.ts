/**
 * Declarative Logger for Skillio Lifecycle Events
 */
export const logger = {
  logEvent: (component: string, event: string, metadata?: any) => {
    console.warn(`[EVENT] [${component}] ${event}`, metadata || "");
  },
  
  logError: (component: string, error: string, metadata?: any) => {
    console.error(`[ERROR] [${component}] ${error}`, metadata || "");
  },
  
  logStateChange: (component: string, from: any, to: any) => {
    console.warn(`[STATE] [${component}] Changed from:`, from, "to:", to);
  },
  
  logResource: (resource: string, status: string) => {
    console.warn(`[RESOURCE] [${resource}] ${status.toUpperCase()}`);
  }
};
