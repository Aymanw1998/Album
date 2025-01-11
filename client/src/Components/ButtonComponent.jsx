// ButtonComponent.jsx
import React, { useState } from 'react';

const ButtonComponent = ({ id, label, performTask }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true); // פעולת התחלה
    console.log(`התחלת פעולה לכפתור: ${label}`);

    try {
      await performTask();  // הפעלת המשימה שנשלחה כ-prop
    } catch (error) {
      console.error('שגיאה', error);
    } finally {
      setLoading(false); // פעולת סיום
      console.log(`הפעולה הסתיימה לכפתור: ${label}`);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'מבצע פעולה...' : label}
    </button>
  );
};

export default ButtonComponent;
