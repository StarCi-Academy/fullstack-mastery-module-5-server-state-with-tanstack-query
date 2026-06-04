import type { PropsWithChildren } from "react"
import { HeroUIProvider as HeroUIRoot, I18nProvider } from "@heroui/react"

/**
 * HeroUI provider — wraps the client tree for @heroui/react components.
 */
export const HeroUIProvider = ({ children }: PropsWithChildren) => {
  return (
    <HeroUIRoot>
      <I18nProvider>{children}</I18nProvider>
    </HeroUIRoot>
  )
}
