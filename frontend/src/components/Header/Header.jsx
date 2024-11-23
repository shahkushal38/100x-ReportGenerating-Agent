import React, { useState } from 'react';
import { Modal, Text, Stack, CommandButton } from '@fluentui/react';

const headerStyles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    backgroundColor: '#0078d4',
    color: 'white',
    height: '60px',
  },
};

const buttonStyles = {
  root: {
    marginRight: '16px',
  },
  rootHovered: {
    color: 'white',
  }
};

const modalStyles = {
  main: {
    padding: '20px',
    maxWidth: '400px',
  },
};

export const HeaderWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header style={headerStyles.root}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 'bold' } }}>
          Reporting Agent
        </Text>
        <CommandButton text="Upload Data" styles={buttonStyles}  onClick={openModal} />
      </header>

      <Modal
        isOpen={isModalOpen}
        onDismiss={closeModal}
        isBlocking={false}
        styles={modalStyles}
      >
        <Stack tokens={{ childrenGap: 15 }}>
          <Text variant="large" styles={{ root: { fontWeight: 'bold' } }}>
            Modal Title
          </Text>
          <Text>
            This is a modal using Fluent UI. You can customize its content as
            needed.
          </Text>
        </Stack>
      </Modal>
    </>
  );
};

export default HeaderWithModal;
