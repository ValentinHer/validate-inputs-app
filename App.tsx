import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function App() {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [submittedTexts, setSubmittedTexts] = useState<{ text1: string; text2: string }>({
    text1: '',
    text2: '',
  });
  const [errors, setErrors] = useState<{ input1?: string; input2?: string }>({});

  const validate = () => {
    const newErrors: { input1?: string; input2?: string } = {};
    if (!input1.trim()) newErrors.input1 = 'El texto 1 es obligatorio';
    if (!input2.trim()) newErrors.input2 = 'El texto 2 es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmittedTexts({ text1: input1, text2: input2 });
      setInput1('');
      setInput2('');
      setErrors({});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <Text style={styles.text}>{submittedTexts.text1.length > 0 && submittedTexts.text2.length > 0 ? `${submittedTexts.text1} ${submittedTexts.text2}` : 'Ingrese un texto'}</Text>
      </View>

      <TextInput
        style={[styles.input, errors.input1 && styles.inputError]}
        placeholder="Ingrese el texto 1"
        value={input1}
        onChangeText={setInput1}
      />
      {errors.input1 && <Text style={styles.errorText}>{errors.input1}</Text>}

      <TextInput
        style={[styles.input, errors.input2 && styles.inputError]}
        placeholder="Ingrese el texto 2"
        value={input2}
        onChangeText={setInput2}
      />
      {errors.input2 && <Text style={styles.errorText}>{errors.input2}</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Enviar" onPress={handleSubmit} color="#007AFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  square: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    minHeight: 120,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
    color: '#007AFF',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    textAlign: 'center'
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 12,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden', // para que el botón respete el borderRadius
  },
});
