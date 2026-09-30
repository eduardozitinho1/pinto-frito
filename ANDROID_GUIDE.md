# 📱 Aplicativo Android Nativo - Restaurante Pinto Frito

Este projeto foi configurado com **Capacitor** e **Android Gradle** nativo, permitindo gerar um APK ou pacote AAB para a Google Play Store, além de suporte completo a WebAPK (PWA instalável).

---

## 🚀 Como Gerar o APK do Aplicativo Android

### 1. Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **Java JDK** 17 ou 21
- **Android Studio** (com Android SDK Build-Tools e Platform 34/35)

---

### 2. Comandos Rápidos de Build

Na pasta raiz do projeto:

```bash
# 1. Compila os arquivos web e sincroniza com o Android nativo
npm run android:build

# 2. Entra na pasta do Android e compila o APK de desenvolvimento (Debug)
cd android
./gradlew assembleDebug
```

O arquivo APK compilado estará localizado em:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Você pode transferir este arquivo `.apk` diretamente para qualquer smartphone Android e instalá-lo!

---

### 3. Abrir no Android Studio

Para depurar com emulador ou aparelho físico via cabo USB:

```bash
npx cap open android
```

No Android Studio:
1. Aguarde a indexação do Gradle.
2. Clique no botão verde de **Run** (ícone de play ▶️) para rodar no seu celular conectado ou emulador.
3. Para gerar APK assinado de produção: Vá em **Build** > **Generate Signed Bundle / APK...**.

---

### 4. Estrutura do Projeto Android Nativo

- **`android/app/src/main/AndroidManifest.xml`**: Configurações de permissões (Internet, Notificações), launcher e orientação.
- **`android/app/src/main/java/com/pintofrito/app/MainActivity.java`**: Ponto de entrada nativo da aplicação Android.
- **`android/app/src/main/res/values/strings.xml`**: Nome do aplicativo (`Pinto Frito`) e esquemas de URL.
- **`android/app/src/main/assets/public/`**: Bundles otimizados do cardápio e checkout.
- **`capacitor.config.ts`**: Configuração central do Capacitor ID (`com.pintofrito.app`).

---

### 5. Instalação Instantânea no Celular (Sem Android Studio)
Os clientes também podem instalar o app instantaneamente pelo navegador Google Chrome do Android:
1. Abra a URL do site no Chrome do celular.
2. Toque nos 3 pontos verticais (⋮) no canto superior direito.
3. Toque em **"Instalar Aplicativo"** ou **"Adicionar à tela inicial"**.
4. O Google Play Services cria automaticamente um pacote WebAPK nativo na gaveta de aplicativos do celular!
