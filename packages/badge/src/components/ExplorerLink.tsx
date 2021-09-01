import { chainIDToExplorer } from '@rainbowkit/utils'
import React from 'react'
import styles from '../../styles/ExplorerLink.module.css'

export type ExplorerProps = { chainId?: number; address: string; explorerUrl?: string } & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export const ExplorerLink = ({ chainId, address, explorerUrl, ...props }: ExplorerProps) => (
  <a
    className={styles.link}
    href={`https://${explorerUrl || chainIDToExplorer(chainId)}/address/${address}`}
    target="_blank"
    rel="noreferrer"
    {...props}
  >
    View on explorer
  </a>
)
