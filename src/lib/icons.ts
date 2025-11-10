import {
  HomeIcon,
  BoltIcon,
  ShoppingBagIcon,
  TruckIcon,
  SparklesIcon,
  ShoppingCartIcon,
  FilmIcon,
  HeartIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  MapIcon,
  GiftIcon,
  EllipsisHorizontalIcon,
  BanknotesIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

type IconName =
  | 'home'
  | 'bolt'
  | 'shopping-bag'
  | 'truck'
  | 'utensils'
  | 'shopping-cart'
  | 'film'
  | 'heart'
  | 'shield-check'
  | 'credit-card'
  | 'currency-dollar'
  | 'academic-cap'
  | 'map'
  | 'gift'
  | 'ellipsis-horizontal'
  | 'banknotes'
  | 'wallet';

const heroIconMap: Record<
  IconName,
  React.ComponentType<{ className?: string }>
> = {
  home: HomeIcon,
  bolt: BoltIcon,
  'shopping-bag': ShoppingBagIcon,
  truck: TruckIcon,
  utensils: SparklesIcon,
  'shopping-cart': ShoppingCartIcon,
  film: FilmIcon,
  heart: HeartIcon,
  'shield-check': ShieldCheckIcon,
  'credit-card': CreditCardIcon,
  'currency-dollar': CurrencyDollarIcon,
  'academic-cap': AcademicCapIcon,
  map: MapIcon,
  gift: GiftIcon,
  'ellipsis-horizontal': EllipsisHorizontalIcon,
  banknotes: BanknotesIcon,
  wallet: WalletIcon,
};

/**
 * Get Heroicon component by icon name
 * @param iconName - The icon name (e.g., 'home', 'bolt')
 * @returns The Heroicon component or null if not found
 */
export function getHeroIcon(
  iconName: string
): React.ComponentType<{ className?: string }> | null {
  return heroIconMap[iconName as IconName] || null;
}
