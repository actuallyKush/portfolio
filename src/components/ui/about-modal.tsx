import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cv = {
  fr: {
    name: 'Kush Deoghare',
    title: 'Recherche un stage de Master (4–6 mois) — Ingénierie des Systèmes Embarqués',
    contact: 'kush.deoghare@gmail.com · +33 7 51 07 69 94 · Saint-Étienne-du-Rouvray, France',
    sections: [
      {
        heading: 'Profil',
        body: "Ingénieur en électronique et systèmes embarqués avec une expertise couvrant l'ensemble de la stack : conception RTL/FPGA en VHDL et Verilog, développement firmware bas niveau en C embarqué sur ARM Cortex-M et MSP-430, intégration IoT, RTOS et vision par ordinateur. Sélectionné pour un entretien technique RTL Design chez Apple. Expérience concrète à travers des projets R&D appliqués, dont un drone autonome complet avec pipeline V-SLAM monoculaire. Allie rigueur technique, capacité d'apprentissage rapide et collaboration interculturelle."
      },
      {
        heading: 'Formation',
        body: `Master en Électronique et Systèmes Embarqués — ESIGELEC, Rouen (avec INSA Rouen) — 09/2024 – En cours
Bachelor en Informatique et Électronique — Heriot-Watt University, Édimbourg — 2019 – 2023`
      },
      {
        heading: 'Expérience',
        body: `Formateur IA Freelance / Stagiaire — Mindrift — 10/2025 – En cours
Technicien Support — Gamers Incorporated — 2018 – 2019`
      },
      {
        heading: 'Compétences Techniques',
        body: `RTL & FPGA: VHDL, Verilog, Intel FPGA, Xilinx, Microsemi
Firmware & Embarqué: ARM Cortex-M, MSP430, STM32, C embarqué, RTOS
Protocoles: I2C, SPI, UART, Bluetooth, Zigbee, Wi-Fi, MQTT, CAN
Électronique: Conception numérique/analogique, PCB, EasyEDA, PID
Développement: C, C++, Python, Java, MATLAB, Qt, Git, Bash, Make, CMake
CAO: Fusion 360, SolidWorks, EasyEDA
Vision & IA: OpenCV, ORB, V-SLAM, MediaPipe, TensorFlow, Keras, ROS2`
      },
      {
        heading: 'Points Forts',
        body: `• UART transceiver avec communication laser (FPGA)
• Robot suiveur de ligne MSP430 avec PID
• Application RTOS multitâche (µC/OS-II)
• Drone autonome avec V-SLAM monoculaire, MediaPipe, ROS2
• Radio FM complète (circuit → PCB → soudure → intégration)
• Application Android de paroles de chansons avec API iTunes`
      },
      {
        heading: 'Langues',
        body: 'Anglais — Courant | Français — Intermédiaire (B1–B2) | Hindi — Natif | Marathi — Natif'
      }
    ]
  },
  en: {
    name: 'Kush Deoghare',
    title: 'Seeking a 4-6 Month Master\'s Internship in Embedded Systems Engineering',
    contact: 'kush.deoghare@gmail.com · +33 7 51 07 69 94 · Saint-Étienne-du-Rouvray, France',
    sections: [
      {
        heading: 'Profile',
        body: 'Highly motivated Electronics and Embedded Systems Engineer with strong technical expertise in microcontroller programming, FPGA/VHDL design, IoT integration, and robotics. Proven ability to deliver innovative embedded solutions through hands-on project implementation and applied research. Combines technical depth with demonstrated leadership, cross-cultural collaboration, and customer-facing experience.'
      },
      {
        heading: 'Education',
        body: `MSc in Electronics & Embedded Systems Engineering — ESIGELEC, Rouen (with INSA Rouen) — 09/2024 – Present
BEng in Computing & Electronics Engineering — Heriot-Watt University, Edinburgh — 2019 – 2023`
      },
      {
        heading: 'Professional Experience',
        body: `Freelance AI Tutor / Trainee — Mindrift — 10/2025 – Present
Technical Support Specialist — Gamers Incorporated — 2018 – 2019`
      },
      {
        heading: 'Technical Competencies',
        body: `Embedded Systems: ARM Cortex-M, STM32, MSP430, Arduino, Raspberry Pi, BeagleBone, Embedded C, RTOS
FPGA & Digital: VHDL, Verilog, Intel FPGA, Digital Logic Design, Simulation, SoC Architecture
IoT & Protocols: I2C, SPI, UART, Bluetooth, Zigbee, Wi-Fi, M2M, Wireless Sensor Networks
Software: C, C++, Python, Java, MATLAB, Qt, Git, Bash, Make, CMake, CI/CD
Electronics: Digital/Analog Design, PCB, EasyEDA, Power Electronics, PID Control
Design Tools: Fusion 360, SolidWorks, EasyEDA, Xilinx Vivado
Vision & AI: OpenCV, ORB, V-SLAM, MediaPipe, TensorFlow, Keras, ROS2`
      },
      {
        heading: 'Technical Highlights',
        body: `• UART transceiver with laser communication (FPGA)
• MSP430 line-following robot with PID navigation
• Multitasking RTOS application (µC/OS-II) with display
• Autonomous drone: V-SLAM, MediaPipe gesture control, ROS2
• FM radio — circuit design, PCB layout, soldering, integration
• Android app with iTunes Search API integration`
      },
      {
        heading: 'Languages',
        body: 'English — Fluent (Native) | French — Intermediate (B1–B2) | Hindi — Native | Marathi — Native'
      }
    ]
  }
}

type Lang = 'fr' | 'en'

function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lang, setLang] = useState<Lang>('en')
  const data = cv[lang]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
          style={{ perspective: '1200px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='absolute inset-0 bg-black/20 backdrop-blur-sm' onClick={onClose} />
          <motion.div
            className='relative w-full max-w-2xl max-h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden'
            style={{ transformOrigin: 'top center' }}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className='sticky top-0 bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between'>
              <div className='flex gap-2'>
                <button
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${lang === 'fr' ? 'bg-black text-white border-black' : 'text-black/50 border-black/20 hover:border-black/50'}`}
                  onClick={() => setLang('fr')}
                >
                  FR
                </button>
                <button
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${lang === 'en' ? 'bg-black text-white border-black' : 'text-black/50 border-black/20 hover:border-black/50'}`}
                  onClick={() => setLang('en')}
                >
                  EN
                </button>
              </div>
              <button
                className='text-black/30 hover:text-black transition-colors text-lg leading-none'
                onClick={onClose}
              >
                ×
              </button>
            </div>
            <div className='px-6 py-4 overflow-y-auto max-h-[calc(80vh-60px)] space-y-5 text-left text-black/80'>
              <div>
                <h2 className='text-lg font-bold text-black'>{data.name}</h2>
                <p className='text-sm text-black/60 mt-0.5'>{data.contact}</p>
              </div>
              {data.sections.map(s => (
                <div key={s.heading}>
                  <h3 className='text-xs font-bold text-black/40 uppercase tracking-wider mb-1'>{s.heading}</h3>
                  <p className='text-sm leading-relaxed whitespace-pre-line'>{s.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { AboutModal }