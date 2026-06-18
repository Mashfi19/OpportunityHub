import { IOpportunityProvider } from "@/core/domain/provider";

export class ProviderRegistry {
  private static providers: Map<string, IOpportunityProvider> = new Map();

  /**
   * Register a new strategy provider.
   */
  public static register(provider: IOpportunityProvider): void {
    if (this.providers.has(provider.id)) {
      throw new Error(`Provider with ID "${provider.id}" is already registered.`);
    }
    this.providers.set(provider.id, provider);
  }

  /**
   * Get a specific provider by its ID.
   */
  public static get(id: string): IOpportunityProvider | undefined {
    return this.providers.get(id);
  }

  /**
   * Get all registered strategy providers.
   */
  public static getAll(): IOpportunityProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Clear all registered providers (mostly for testing purposes).
   */
  public static clear(): void {
    this.providers.clear();
  }
}
