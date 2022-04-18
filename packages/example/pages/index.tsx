import { ConnectButton, useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import React, { ComponentProps, useState } from 'react';
import { useAccount } from 'wagmi';

type ConnectButtonProps = ComponentProps<typeof ConnectButton>;
type ExtractString<Value> = Value extends string ? Value : never;
type AccountStatus = ExtractString<ConnectButtonProps['accountStatus']>;
type ChainStatus = ExtractString<ConnectButtonProps['chainStatus']>;

const Example = () => {
  const [{ data: accountData }] = useAccount();
  const defaultProps = ConnectButton.__defaultProps;

  const [accountStatusSmallScreen, setAccountStatusSmallScreen] =
    useState<AccountStatus>(defaultProps.accountStatus);
  const [accountStatusLargeScreen, setAccountStatusLargeScreen] =
    useState<AccountStatus>(defaultProps.accountStatus);

  const [chainStatusSmallScreen, setChainStatusSmallScreen] =
    useState<ChainStatus>(defaultProps.chainStatus.smallScreen);
  const [chainStatusLargeScreen, setChainStatusLargeScreen] =
    useState<ChainStatus>(defaultProps.chainStatus.largeScreen);

  const [showBalanceSmallScreen, setShowBalanceSmallScreen] = useState<boolean>(
    defaultProps.showBalance.smallScreen
  );
  const [showBalanceLargeScreen, setShowBalanceLargeScreen] = useState<boolean>(
    defaultProps.showBalance.largeScreen
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <ConnectButton
          accountStatus={{
            largeScreen: accountStatusLargeScreen,
            smallScreen: accountStatusSmallScreen,
          }}
          chainStatus={{
            largeScreen: chainStatusLargeScreen,
            smallScreen: chainStatusSmallScreen,
          }}
          showBalance={{
            largeScreen: showBalanceLargeScreen,
            smallScreen: showBalanceSmallScreen,
          }}
        />
      </div>

      <div>
        <h3 style={{ fontFamily: 'sans-serif' }}>Custom buttons</h3>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            mounted,
            openAccountModal,
            openChainModal,
            openConnectModal,
          }) => (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {!account ? (
                <button onClick={openConnectModal} type="button">
                  Connect Wallet
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 12 }}>
                  {chain && (
                    <button
                      onClick={openChainModal}
                      style={{ alignItems: 'center', display: 'flex' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            borderRadius: 999,
                            height: 12,
                            marginRight: 4,
                            overflow: 'hidden',
                            width: 12,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ height: 12, width: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name ?? chain.id}
                    </button>
                  )}
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.balanceFormatted
                      ? ` (${account.balanceFormatted})`
                      : ''}
                  </button>
                </div>
              )}
            </div>
          )}
        </ConnectButton.Custom>
      </div>

      <div style={{ fontFamily: 'sans-serif' }}>
        <h3>ConnectButton props</h3>
        <table cellSpacing={12}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>smallScreen</th>
              <th>largeScreen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="accountStatus">accountStatus</label>
              </td>
              <td>
                <select
                  id="accountStatus"
                  onChange={event =>
                    setAccountStatusSmallScreen(
                      event.currentTarget.value as AccountStatus
                    )
                  }
                  value={accountStatusSmallScreen}
                >
                  <option>full</option>
                  <option>avatar</option>
                  <option>address</option>
                </select>
              </td>
              <td>
                <select
                  id="accountStatus"
                  onChange={event =>
                    setAccountStatusLargeScreen(
                      event.currentTarget.value as AccountStatus
                    )
                  }
                  value={accountStatusLargeScreen}
                >
                  <option>full</option>
                  <option>avatar</option>
                  <option>address</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="showBalance">showBalance</label>
              </td>
              <td>
                <input
                  checked={showBalanceSmallScreen}
                  id="showBalance"
                  onChange={event => {
                    setShowBalanceSmallScreen(event.currentTarget.checked);
                  }}
                  type="checkbox"
                />
              </td>
              <td>
                <input
                  checked={showBalanceLargeScreen}
                  id="showBalance"
                  onChange={event => {
                    setShowBalanceLargeScreen(event.currentTarget.checked);
                  }}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="chainStatus">chainStatus</label>
              </td>
              <td>
                <select
                  id="chainStatus"
                  onChange={event =>
                    setChainStatusSmallScreen(
                      event.currentTarget.value as ChainStatus
                    )
                  }
                  value={chainStatusSmallScreen}
                >
                  <option>full</option>
                  <option>icon</option>
                  <option>name</option>
                  <option>none</option>
                </select>
              </td>
              <td>
                <select
                  id="chainStatus"
                  onChange={event =>
                    setChainStatusLargeScreen(
                      event.currentTarget.value as ChainStatus
                    )
                  }
                  value={chainStatusLargeScreen}
                >
                  <option>full</option>
                  <option>icon</option>
                  <option>name</option>
                  <option>none</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {accountData ? <ManageTransactions /> : null}
    </div>
  );
};

function ManageTransactions() {
  const addRecentTransaction = useAddRecentTransaction();

  const [hash, setHash] = useState('');
  const [description, setDescription] = useState('');
  const [confirmations, setConfirmations] = useState(1);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        addRecentTransaction({
          confirmations: confirmations === 1 ? undefined : confirmations,
          description: description.trim() || 'Transaction',
          hash: hash.trim(),
        });

        setHash('');
        setDescription('');
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        gap: 12,
      }}
    >
      <h3>Add recent transaction</h3>
      <div style={{ display: 'flex', gap: 12 }}>
        <label htmlFor="txHash">Hash</label>
        <input
          id="txHash"
          onChange={e => setHash(e.currentTarget.value)}
          type="text"
          value={hash}
        />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <label htmlFor="txDescription">Description</label>
        <input
          id="txDescription"
          onChange={e => setDescription(e.currentTarget.value)}
          type="text"
          value={description}
        />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <label htmlFor="txConfirmations">Confirmations</label>
        <input
          id="txConfirmations"
          onChange={e => setConfirmations(e.currentTarget.valueAsNumber)}
          type="number"
          value={confirmations}
        />
      </div>
      <div>
        <button disabled={hash.trim().length === 0} type="submit">
          Add recent transaction
        </button>
      </div>
    </form>
  );
}

export default Example;
