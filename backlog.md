# Backlog de KIPTEK - Checklist para Completar el Proyecto

## 🎯 Objetivo
Completar KIPTEK: Sistema de votación privada on-chain en Scroll zkEVM con IA, superando a OMP en transparencia y usabilidad. Entregar en Taikai con repo, PDFs y video.

## 📋 Checklist de Tareas

### 1. Backend (Smart Contract)
- [x] Crear contrato básico KIPTEKVoting.sol (votación simple, OpenZeppelin).
- [ ] Mejorar privacidad: Implementar esquema commit-reveal básico para anonimato (sin ZK full por tiempo).
- [ ] Agregar funciones: Verificación de identidad básica (e.g., hash de DNI), conteo automático.
- [ ] Optimizar gas: Revisar y reducir costos en Scroll.
- [ ] Tests: Agregar más tests (votación múltiple, edge cases).
- [ ] Compilar y verificar: Asegurar sin errores.

### 2. Frontend (UI/UX)
- [x] Crear app React básica con ethers.js.
- [ ] Conectar a contrato: Actualizar ABI y dirección deployada.
- [ ] Mejorar UI: Diseño amigable (responsive, accesible), mostrar candidatos, votos en tiempo real.
- [ ] Integrar wallet: MetaMask connection, manejo de errores.
- [ ] Simular inclusión: Placeholder para account abstraction (futuro).
- [ ] Testing: Probar en browser, mobile-friendly.

### 3. IA y Privacidad
- [ ] Implementar IA off-chain: Usar API gratuita (Hugging Face) para verificación de identidad (e.g., OCR en DNI).
- [ ] Integrar: Frontend llama a API, valida antes de votar.
- [ ] Privacidad: Asegurar datos no se almacenen, solo verificación.
- [ ] Placeholder ZK: Documentar cómo agregar ZK proofs (circom) en futuro.

### 4. Deploy y Integración
- [ ] Configurar Scroll Sepolia: Obtener PRIVATE_KEY (no subir), actualizar hardhat.config.js.
- [ ] Deploy contrato: Ejecutar `npm run deploy`, copiar dirección.
- [ ] Conectar frontend: Actualizar CONTRACT_ADDRESS en App.js.
- [ ] Verificar on-chain: Usar Scroll explorer para ver transacciones.

### 5. Documentación y Entrega
- [x] README.md: Actualizar con setup, uso, arquitectura.
- [ ] Pitch Deck PDF: Crear slides (problema, solución, tech, beneficios) en Canva/Figma.
- [ ] Brainstorming PDF: Ideas iniciales, inspiración en OMP.
- [ ] Wireframes PDF: Bocetos de UI (simples en Figma).
- [ ] Video Demo: Grabar 3-5 min mostrando votación, resultados on-chain (usar OBS).
- [ ] Unificar PDFs: Combinar en un archivo para Taikai.
- [ ] Repo commits: Hacer commits por tarea para mostrar progreso.

### 6. Testing y QA
- [x] Tests contrato: Pasando.
- [ ] Tests frontend: Funcionalidad completa.
- [ ] QA: Revisar usabilidad, seguridad básica (no reentrancy).
- [ ] Feedback: Probar con amigos, ajustar.

### 7. Entrega Final
- [ ] Subir a Taikai: Repo link, PDFs, video.
- [ ] Verificar: Todo público, sin enlaces acortados.
- [ ] Backup: Guardar todo localmente.

## ⏰ Timeline Estimado (para completar en horas)
- Backend mejoras: 1-2 horas.
- Frontend conexión: 1 hora.
- IA básica: 1 hora.
- Deploy: 30 min.
- Docs/PDFs/Video: 2-3 horas.
- Total: 6-8 horas (factible en una noche).

## 🚀 Motivación
¡Vamos a ganar! KIPTEK es innovador: privacidad on-chain, IA para inclusión, mejor que OMP. Enfócate en MVP funcional, explica extensiones futuras. ¡Tú puedes!

---

**Próximos pasos:** Marca tareas completadas, actualiza commits. ¿Por dónde empezamos?