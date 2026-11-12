/**
 * Architecture v2 service contracts only.
 * No live backend, database, authentication or payment implementation is introduced here.
 * Domain UI may depend on these interfaces; provider-specific adapters belong outside domain code.
 */
export interface StorageGateway {
  putPrivate(input: { key: string; bytes: Uint8Array; contentType: string }): Promise<{ key: string }>;
  remove(key: string): Promise<void>;
}
export interface UploadGateway {
  createUploadIntent(input: { purpose: string; fileName: string; contentType: string; bytes: number }): Promise<{ uploadId: string; expiresAt: string }>;
}
export interface ApiGateway {
  request<T>(input: { method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'; path: string; body?: unknown }): Promise<T>;
}
export interface DatabaseGateway {
  get<T>(collection: string, id: string): Promise<T | null>;
  put<T>(collection: string, id: string, value: T): Promise<void>;
}
export interface AuthGateway {
  currentSession(): Promise<{ userId: string } | null>;
  signOut(): Promise<void>;
}
export interface CommerceGateway {
  createHandoff(input: { productId: string; designId?: string; quantity: number }): Promise<{ destination: string }>;
}
export interface PaymentGateway {
  createCheckout(input: { orderId: string; amount: number; currency: 'KRW' | string }): Promise<{ destination: string }>;
}
export interface AnalyticsGateway {
  track(event: { name: string; properties?: Record<string, string | number | boolean> }): void;
}
export type ServiceRegistry = {
  api?: ApiGateway;
  storage?: StorageGateway;
  upload?: UploadGateway;
  database?: DatabaseGateway;
  auth?: AuthGateway;
  commerce?: CommerceGateway;
  payment?: PaymentGateway;
  analytics?: AnalyticsGateway;
};
