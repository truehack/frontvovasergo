import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonInput, IonButton } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import './css/style.css';


const Itproger: React.FC = () => {
  const [db, setDb] = useState<SQLiteDBConnection | null>(null);
  const [dbReady, setDbReady] = useState(false);
  const [medicines, setMedicines] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState('');

  useEffect(() => {
    const initDb = async () => {
      if (!Capacitor.isNativePlatform()) {
        console.log('SQLite работает только на мобильных устройствах');
        return;
      }

      try {
        const sqlite = new SQLiteConnection(CapacitorSQLite);
        const connection = await sqlite.createConnection('medicines_db', false, 'no-encryption', 1, false);
        await connection.open();

        await connection.execute(`
          CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
          );
        `, false);

        setDb(connection);

        // Загрузим текущие лекарства
        const res = await connection.query('SELECT * FROM medicines;');
        setMedicines(res.values?.map(v => v.name) || []);

        setDbReady(true);
      } catch (err) {
        console.error('Ошибка инициализации SQLite:', err);
      }
    };

    initDb();
  }, []);

  const addMedicine = async () => {
    if (!db || !dbReady) return;
    const trimmedName = newMedicine.trim();
    if (!trimmedName) return;

    try {
      await db.execute(`INSERT INTO medicines (name) VALUES ('${trimmedName}');`, false);

      const res = await db.query('SELECT * FROM medicines;');
      setMedicines(res.values?.map(v => v.name) || []);

      setNewMedicine('');
      setShowModal(false);
    } catch (err) {
      console.error('Ошибка добавления лекарства:', err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Умный лекарь</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="background">
          <img src="/images/your-background.jpg" alt="фон" />
        </div>

        <div className="itproger-container">
          <div className="top-bar"></div>
          <div className="green-block"></div>

          <div className="profile-icon">👤</div>
          <div className="calendar-icon"></div>

          <div className="days-container">
            <div className="days-row">
              {['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'].map((day, i) => (
                <div key={i} className={`day-item ${i===0?'today':''}`}>
                  <div className="day-name">{day}</div>
                  <div className="day-number">{i+1}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="main-bar">
            <div className="centre-pin"></div>
            <div className="center-circle"></div>
          </div>

          {/* Список лекарств */}
          <div className="medicine-list">
            <h3>Мои лекарства</h3>
            {medicines.length === 0 ? (
              <p>Список пуст. Добавьте лекарство.</p>
            ) : (
              <ul>
                {medicines.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            )}
          </div>

          {/* Нижняя навигация */}
          <div className="bottom-nav">
            <button className="nav-item" onClick={() => setShowModal(true)}>
              <span>Добавить</span>
            </button>
            <button className="nav-item">
              <span>Напоминания</span>
            </button>
            <button className="nav-item">
              <span>Настройки</span>
            </button>
          </div>

          {/* Модальное окно добавления */}
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <div style={{ padding: 20 }}>
              <h3>Добавить лекарство</h3>
              <IonInput
                placeholder="Название лекарства"
                value={newMedicine}
                onIonChange={e => setNewMedicine(e.detail.value!)}
              />
              <IonButton expand="block" onClick={addMedicine} disabled={!dbReady}>
                {dbReady ? 'Сохранить' : 'Инициализация...'}
              </IonButton>
              <IonButton fill="clear" onClick={() => setShowModal(false)}>Отмена</IonButton>
            </div>
          </IonModal>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Itproger;


















