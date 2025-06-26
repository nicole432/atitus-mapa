import './modal.css';
import { useState } from 'react';
import { Input }from '../Input';
import { Button } from '../Button';
export default function Modal({ setModalOpen, handleSavePoint }) {
  const [name, setName] = useState('');
  const [description, setDescriptions] = useState('');

  return (
    <div className="modal-container">
      <div className="modal-box">
        <h2>Registre seu comentário:</h2>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: "100%", marginTop: 8 }}
            placeholder='Nome do estabelecimento'
          />
          <Input
            type="text"
            value={description}
            onChange={e => setDescriptions(e.target.value)}
            style={{ width: "100%", marginTop: 12, marginBottom: 30}}
            placeholder='Comente aqui'
          />
        <div className='modal-buttons'>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => handleSavePoint({ name, description })}
            disabled={!name || !description}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}