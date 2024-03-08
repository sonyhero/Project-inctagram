import { SVGProps, Ref, forwardRef, memo } from 'react'

type PropsType = {
  isActive?: boolean
}

const ACTIVE_LINK_COLOR = '#397df6'
const LINK_COLOR = '#fff'

const SvgComponent = (
  { isActive = true, ...props }: SVGProps<SVGSVGElement> & PropsType,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isActive ? ACTIVE_LINK_COLOR : LINK_COLOR}
    ref={ref}
    {...props}
  >
    {!isActive ? (
      <path d="M6.09002 21.06C5.8248 21.06 5.57045 20.9546 5.38291 20.7671C5.19538 20.5796 5.09002 20.3252 5.09002 20.06L4.94002 5.4C4.92798 5.10234 4.9749 4.80525 5.07809 4.52579C5.18128 4.24633 5.33871 3.99004 5.5413 3.77164C5.7439 3.55324 5.98768 3.37705 6.25862 3.25321C6.52955 3.12936 6.8223 3.0603 7.12002 3.05L16.71 3C17.0081 3.00521 17.3023 3.06909 17.5757 3.18801C17.8491 3.30692 18.0965 3.47854 18.3035 3.69305C18.5106 3.90756 18.6734 4.16077 18.7826 4.43821C18.8918 4.71565 18.9453 5.01189 18.94 5.31L19.08 19.97C19.0817 20.1452 19.0374 20.3178 18.9514 20.4705C18.8654 20.6232 18.7408 20.7506 18.59 20.84C18.438 20.9278 18.2656 20.974 18.09 20.974C17.9145 20.974 17.742 20.9278 17.59 20.84L11.89 17.68L6.60002 20.91C6.44337 20.9975 6.26909 21.0488 6.09002 21.06ZM11.85 15.51C12.0238 15.5103 12.195 15.5514 12.35 15.63L17.06 18.24L16.94 5.29C16.94 5.09 16.81 4.95 16.73 4.96L7.13002 5.05C7.05002 5.05 6.94002 5.18 6.94002 5.38L7.06002 18.28L11.34 15.65C11.4955 15.561 11.6709 15.5128 11.85 15.51Z" />
    ) : (
      <path d="M6 21C5.82821 20.9995 5.65946 20.9547 5.51 20.87C5.35553 20.7832 5.22691 20.6569 5.1373 20.504C5.04769 20.3511 5.00031 20.1772 5 20V5.33C4.98648 4.73032 5.20983 4.14946 5.62163 3.71332C6.03344 3.27718 6.60053 3.02089 7.2 3H16.8C17.3995 3.02089 17.9666 3.27718 18.3784 3.71332C18.7902 4.14946 19.0135 4.73032 19 5.33V20C18.9989 20.1745 18.9522 20.3457 18.8645 20.4966C18.7768 20.6475 18.6511 20.7727 18.5 20.86C18.348 20.9478 18.1755 20.994 18 20.994C17.8245 20.994 17.652 20.9478 17.5 20.86L11.83 17.65L6.5 20.85C6.34955 20.9434 6.17701 20.9951 6 21Z" />
    )}
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const Bookmark = memo(ForwardRef)
