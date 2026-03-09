import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'

function Counter({ value }) {
  const numeric = parseInt(value, 10)
  const suffix = isNaN(numeric) ? '' : value.replace(String(numeric), '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isNaN(numeric)) return

    let current = 0
    const end = numeric
    const duration = 800
    const steps = 40
    const increment = end / steps
    const stepTime = duration / steps

    const timer = setInterval(() => {
      current += increment

      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [numeric])

  if (isNaN(numeric)) return <>{value}</>

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const navLinks = [
    { href: '#home', label: 'Начало' },
    { href: '#about', label: 'За нас' },
    { href: '#crops', label: 'Култури' },
    { href: '#achievements', label: 'Постижения' },
    { href: '#orchard', label: 'Сливи' },
    { href: '#base', label: 'База' },
    { href: '#energy', label: 'Енергия' },
    { href: '#notill', label: 'No-Till' },
    { href: '#map', label: 'Карта' },
    { href: '#contact', label: 'Контакти' },
  ]

  const crops = [
    {
      title: 'Пшеница',
      text: 'Произвеждаме пшеница, съобразена с утвърдените пазарни и качествени изисквания. Количествата и условията се договарят индивидуално.',
      stat: 'Зърнена култура',
    },
    {
      title: 'Слънчоглед',
      text: 'Отглеждаме слънчоглед с фокус върху стабилен добив и качество, подходящ за преработка и търговия на едро.',
      stat: 'Маслодайна култура',
    },
    {
      title: 'Ечемик',
      text: 'Производството на ечемик е съобразено със стандартите за фуражна и търговска реализация и е подходящо за партньорства с фирми.',
      stat: 'Търговска реализация',
    },
    {
      title: 'Царевица',
      text: 'Отглеждаме царевица с акцент върху добива и устойчивото управление на почвената влага чрез no-till технология.',
      stat: 'Устойчив добив',
    },
  ]

  const benefits = [
    'По-добро запазване на влагата',
    'Намалена почвена ерозия',
    'Подобрена структура на почвата',
    'По-нисък въглероден отпечатък',
    'Устойчиво производство в дългосрочен план',
    'Ефективно управление на ресурсите',
  ]

  const stats = [
    { value: '100 дка', label: 'Сливови насаждения' },
    { value: '500 kW', label: 'Фотоволтаична централа' },
    { value: 'No-Till', label: 'Устойчив модел на работа' },
  ]

  const achievements = [
    {
      icon: '☀️',
      value: '500 kW',
      title: 'Фотоволтаична централа',
      text: 'Соларна система, която подпомага устойчивото развитие на стопанството.',
    },
    {
      icon: '🔋',
      value: 'Battery',
      title: 'Система за съхранение',
      text: 'Батерии за съхранение на електроенергия и по-ефективно използване на ресурсите.',
    },
    {
      icon: '🌳',
      value: '100 дка',
      title: 'Сливова градина',
      text: 'Овощни насаждения, които допълват и диверсифицират стопанството.',
    },
    {
      icon: '🌾',
      value: 'No-Till',
      title: 'Устойчиво земеделие',
      text: 'Практики, насочени към по-добра почва, влага и дългосрочна продуктивност.',
    },
  ]

  const highlights = [
    'Производство на пшеница, слънчоглед, ечемик и царевица',
    '100 декара сливови насаждения',
    '500 kW фотоволтаична централа',
    'Батерии за съхранение на електроенергия',
    'Директни продажби и дългосрочно сътрудничество',
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))

    setSuccessMessage('')
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Моля, въведете име.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Моля, въведете имейл.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Моля, въведете валиден имейл.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Моля, въведете съобщение.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Съобщението трябва да е поне 10 символа.'
    }

    return newErrors
  }

  const sendEmail = async () => {
  try {
    await emailjs.send(
      'service_4fltdbc',
      'template_t8dtw4l',
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      },
      'LtTK0PTzIHQy9mueb'
    )

    setSuccessMessage('Съобщението беше изпратено успешно.')
  } catch (error) {
    setSuccessMessage('Възникна грешка при изпращането. Опитай отново.')
    console.error(error)
  }
}

  const handleSubmit = async (e) => {
  e.preventDefault()

  const validationErrors = validateForm()

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    setSuccessMessage('')
    return
  }

  try {
    const response = await fetch('https://raykovagro1-production.up.railway.app/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    })

    const data = await response.json()
    console.log('Response:', data)

    if (response.ok && data.success) {
      setSuccessMessage('Съобщението беше изпратено успешно.')
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } else {
      setSuccessMessage('Грешка при изпращането.')
    }
  } catch (error) {
    console.error('Fetch error:', error)
    setSuccessMessage('Сървърът не отговаря.')
  }
}

  const closeMobileMenu = () => setMenuOpen(false)

  return (
    <div className="min-h-screen scroll-smooth bg-[#f4f1e8] text-stone-800">
      <header className="sticky top-0 z-50 border-b border-white/20 bg-[#103d22]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-1 shadow-2xl">
              <img
                src="/logo5.jpg"
                alt="RAYKOV NO-TILL AGRO logo"
                className="h-14 w-14 rounded-xl object-cover"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-[0.12em] text-white md:text-xl">
                RAYKOV NO-TILL AGRO
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70 md:text-sm">
                
              </p>
            </div>
          </div>

          <nav className="hidden gap-6 text-sm font-medium text-white/85 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-[#d9d1bc]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white lg:hidden"
            aria-label="Отвори меню"
          >
            <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/10 bg-[#103d22]/95 lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="rounded-xl px-3 py-3 text-white/90 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="home"
          className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(218,209,188,0.22),transparent_28%),linear-gradient(135deg,#145a2a_0%,#103d22_52%,#0b2616_100%)] text-white"
        >
          <div className="absolute inset-0 overflow-hidden opacity-90">
            <div className="absolute bottom-10 right-16 hidden md:block [transform:perspective(900px)_rotateX(62deg)_rotateZ(-14deg)] origin-bottom-right opacity-75">
              <div className="grid grid-cols-5 gap-2 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-10 w-16 rounded-md border border-sky-200/20 bg-[linear-gradient(180deg,#1a3f5d,#0d2235)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                  />
                ))}
              </div>
            </div>

            <motion.div
              className="fixed right-20 top-20 z-40 h-24 w-24 rounded-full bg-[#f5d96b] blur-sm"
              animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="fixed right-16 top-12 z-30 h-40 w-40 rounded-full border border-[#f8e7a1]/40"
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="fixed right-8 top-0 z-20 h-64 w-64 rounded-full border border-[#f8e7a1]/20"
              animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,#b48a3c_0%,#c89b48_10%,#d8b15c_18%,transparent_60%)] opacity-90" />

            <div className="absolute inset-x-0 bottom-0 h-40 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 h-32 w-[140%] bg-[repeating-linear-gradient(90deg,rgba(245,214,120,0.95)_0px,rgba(245,214,120,0.95)_2px,transparent_2px,transparent_16px)] [clip-path:polygon(0_100%,3%_20%,6%_100%,9%_28%,12%_100%,15%_18%,18%_100%,21%_32%,24%_100%,27%_22%,30%_100%,33%_26%,36%_100%,39%_18%,42%_100%,45%_24%,48%_100%,51%_20%,54%_100%,57%_30%,60%_100%,63%_18%,66%_100%,69%_28%,72%_100%,75%_22%,78%_100%,81%_30%,84%_100%,87%_18%,90%_100%,93%_26%,96%_100%,100%_24%)] opacity-70"
                animate={{ x: [0, -40, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                className="absolute bottom-0 left-0 h-28 w-[150%] bg-[repeating-linear-gradient(90deg,rgba(232,198,96,0.85)_0px,rgba(232,198,96,0.85)_2px,transparent_2px,transparent_18px)] [clip-path:polygon(0_100%,2%_28%,4%_100%,6%_18%,8%_100%,10%_32%,12%_100%,14%_20%,16%_100%,18%_26%,20%_100%,22%_18%,24%_100%,26%_30%,28%_100%,30%_24%,32%_100%,34%_18%,36%_100%,38%_28%,40%_100%,42%_22%,44%_100%,46%_30%,48%_100%,50%_18%,52%_100%,54%_26%,56%_100%,58%_20%,60%_100%,62%_30%,64%_100%,66%_18%,68%_100%,70%_24%,72%_100%,74%_22%,76%_100%,78%_30%,80%_100%,82%_18%,84%_100%,86%_26%,88%_100%,90%_20%,92%_100%,94%_32%,96%_100%,98%_18%,100%_100%)] opacity-65"
                animate={{ x: [0, 35, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <motion.div
              className="absolute bottom-14 left-[-260px]"
              animate={{ x: ['-30vw', '115vw'] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <div className="relative h-24 w-44">
                <div className="absolute bottom-6 left-10 h-8 w-20 rounded-md bg-[#2f5d31] shadow-lg" />
                <div className="absolute bottom-12 left-16 h-7 w-14 rounded-t-xl bg-[#3f7a42]" />
                <div className="absolute bottom-14 left-24 h-5 w-5 rounded-sm bg-sky-100/70" />
                <div className="absolute bottom-9 right-8 h-3 w-12 rounded-full bg-[#2f5d31]" />
                <div className="absolute bottom-7 right-0 h-7 w-12 rounded-md bg-[#3f7a42]" />
                <div className="absolute bottom-2 left-12 h-5 w-5 rounded-full bg-[#1b1b1b]" />
                <div className="absolute bottom-0 left-3 h-10 w-10 rounded-full border-[5px] border-[#1b1b1b] bg-stone-700" />
                <div className="absolute bottom-0 left-24 h-8 w-8 rounded-full border-4 border-[#1b1b1b] bg-stone-700" />
                <div className="absolute bottom-4 left-[18px] h-1 w-1 rounded-full bg-stone-400" />
                <div className="absolute bottom-3 left-[30px] h-1 w-1 rounded-full bg-stone-400" />
                <div className="absolute bottom-3 left-[128px] h-1 w-1 rounded-full bg-stone-400" />
                <div className="absolute bottom-14 left-11 h-10 w-1 rounded-full bg-[#1f1f1f]" />
              </div>
            </motion.div>
          </div>

          <div className="relative mx-auto grid max-w-[1800px] gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/90 shadow-lg">
                Устойчиво земеделие и модерно развитие
              </p>

              <h2 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl xl:text-7xl">
                Земеделие с визия, енергия и грижа за почвата
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                RAYKOV NO-TILL AGRO ЕООД отглежда пшеница, слънчоглед, ечемик и царевица,
                развива 100 декара сливови насаждения и разполага с 500 kW фотоволтаична
                централа. Съчетава модерни практики, no-till технология и устойчив подход към
                всяко направление в стопанството.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#achievements"
                  className="rounded-2xl bg-[#e8dfcb] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#103d22] shadow-2xl transition hover:-translate-y-0.5"
                >
                  Разгледай дейностите
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
                >
                  Свържи се с нас
                </a>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.28em] text-white/65">Профил на стопанството</p>
                <h3 className="mt-3 text-2xl font-bold">Земеделие, овощни насаждения и енергийна устойчивост</h3>
                <p className="mt-4 leading-8 text-white/85">
                  Модерен агробизнес, който комбинира производство, диверсификация и ефективно
                  управление на ресурсите.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.value}
                    className="flex min-h-[170px] flex-col justify-center rounded-[1.75rem] border border-white/10 bg-white/10 p-5 text-center shadow-xl backdrop-blur"
                  >
                    <p className="text-[2rem] font-black leading-tight text-[#efe7d6]">
                      <Counter value={item.value} />
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/80">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="achievements" className="pb-24 pt-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#145a2a]">
                Какво сме постигнали
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#14311f] md:text-5xl">
                Устойчиво стопанство с модерна визия
              </h2>
              <p className="mx-auto mt-4 max-w-3xl leading-8 text-stone-700">
                Комбинираме земеделие, овощни насаждения и енергийна ефективност в една модерна и дългосрочно развиваща се структура.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-[#e5ddcc] bg-white p-6 shadow-[0_20px_50px_rgba(20,90,42,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(20,90,42,0.12)]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#145a2a]/10 text-3xl">
                    {item.icon}
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#145a2a]">
                    <Counter value={item.value} />
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-[#14311f]">{item.title}</h3>
                  <p className="mt-4 leading-7 text-stone-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="absolute inset-x-6 top-12 h-64 rounded-[3rem] bg-gradient-to-r from-[#145a2a]/10 to-transparent blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#145a2a]">
                За нас
              </p>
              <h2 className="max-w-2xl text-3xl font-black leading-tight text-[#14311f] md:text-5xl">
                Стопанство, изградено върху устойчивост, дългосрочна стойност и доверие
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-stone-700">
                RAYKOV NO-TILL AGRO ЕООД е земеделско стопанство, специализирано в отглеждането на
                пшеница, слънчоглед, ечемик и царевица. Паралелно с това развиваме 100 декара
                сливови насаждения, поддържаме 500 kW фотоволтаична централа и система за съхранение на енергия
                като част от нашия устойчив модел на работа.
              </p>
              <p className="mt-4 max-w-2xl leading-8 text-stone-700">
                Работим с търговски и преработвателни фирми, като предлагаме предвидимост,
                коректност и възможност за стабилни дългосрочни партньорства.
              </p>
            </div>

            <div className="rounded-[2.25rem] border border-[#d8d1c3] bg-white/80 p-8 shadow-[0_30px_80px_rgba(20,90,42,0.08)] backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#145a2a]" />
                <h3 className="text-2xl font-bold text-[#14311f]">Основни акценти</h3>
              </div>

              <div className="grid gap-4">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#ebe5d6] bg-[#faf8f2] px-5 py-4 text-stone-700 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="crops" className="bg-white/70 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#145a2a]">
              Дейности и култури
            </p>
            <h2 className="mb-14 text-3xl font-black text-[#14311f] md:text-5xl">
              Основни направления в стопанството
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {crops.map((crop) => (
                <article
                  key={crop.title}
                  className="group rounded-[2rem] border border-[#ebe4d4] bg-[#fcfbf8] p-6 shadow-[0_12px_30px_rgba(20,90,42,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(20,90,42,0.12)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-[#145a2a]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#145a2a]">
                      {crop.stat}
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-black text-[#14311f]">{crop.title}</h3>
                  <p className="mb-8 leading-7 text-stone-700">{crop.text}</p>
                  <a
                    href="#contact"
                    className="inline-flex rounded-xl bg-[#145a2a] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition group-hover:bg-[#103d22]"
                  >
                    Запитване
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="orchard" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#145a2a]">
                  Сливова градина
                </p>
                <h2 className="text-3xl font-black text-[#14311f] md:text-5xl">
                  100 декара сливи
                </h2>
                <p className="mt-6 leading-8 text-stone-700">
                  Сливовата градина е ключова част от диверсифицираното развитие на стопанството.
                  Насажденията са разположени в добре организирани масиви и допринасят за устойчивия
                  модел на работа и дългосрочната стойност на бизнеса.
                </p>
                <p className="mt-4 leading-8 text-stone-700">
                  Използваме реално изображение на градината, за да покажем мащаба и подредбата на
                  насажденията като част от нашето земеделско портфолио.
                </p>
              </div>

              <div className="overflow-hidden rounded-[2.5rem] border border-[#e5ddcc] bg-white p-3 shadow-[0_20px_60px_rgba(20,90,42,0.08)]">
                <img
                  src="/image.png"
                  alt="Сливова градина - 100 декара"
                  className="h-full w-full rounded-[2rem] object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="base" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#145a2a]">
                  Нашата база
                </p>
                <h2 className="mt-3 text-4xl font-black text-[#14311f]">
                  Земеделска база и организация на дейността
                </h2>
                <p className="mt-6 leading-8 text-stone-700">
                  Базата на RAYKOV NO-TILL AGRO е центърът на нашата земеделска дейност. Оттук
                  управляваме обработката на земята, поддръжката на техниката и логистиката на
                  стопанството.
                </p>
                <p className="mt-4 leading-8 text-stone-700">
                  Локацията позволява бърз достъп до обработваемите площи, овощните насаждения и
                  фотоволтаичната централа, което осигурява ефективна работа и устойчиво развитие.
                </p>
              </div>

              <div className="overflow-hidden rounded-[2.5rem] border border-[#e5ddcc] bg-[#faf8f3] p-3 shadow-[0_20px_60px_rgba(20,90,42,0.08)]">
                <img
                  src="/base.jpeg"
                  alt="База на RAYKOV NO-TILL AGRO"
                  className="h-full w-full rounded-[2rem] object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="energy" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#145a2a]">
                Енергийна система
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#14311f] md:text-5xl">
                Фотоволтаици, панели и съхранение на енергия
              </h2>
              <p className="mx-auto mt-4 max-w-3xl leading-8 text-stone-700">
                Енергийната част на стопанството включва 500 kW фотоволтаична централа, слънчеви панели
                и батерии за съхранение на електрическа енергия, които подпомагат по-ефективното
                използване на произведения ресурс.
              </p>
            </div>

            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(10,36,21,0.96),rgba(20,90,42,0.92))] p-8 text-white shadow-[0_25px_70px_rgba(16,61,34,0.28)]">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/70">
                  Соларна енергия
                </p>
                <div className="mt-5 flex items-end gap-2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-5 pb-5 pt-10">
                  <div className="grid flex-1 grid-cols-4 gap-2 [transform:perspective(800px)_rotateX(58deg)] origin-bottom">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className="aspect-[1.25/1] rounded-md border border-sky-200/25 bg-[linear-gradient(180deg,#183a57,#0e2336)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                      >
                        <div className="grid h-full grid-cols-2 gap-px p-1 opacity-80">
                          <span className="rounded-[2px] bg-sky-100/10" />
                          <span className="rounded-[2px] bg-sky-100/10" />
                          <span className="rounded-[2px] bg-sky-100/10" />
                          <span className="rounded-[2px] bg-sky-100/10" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-24 w-2 rounded-full bg-white/10" />
                </div>
                <h3 className="mt-6 text-3xl font-black">Слънчеви панели, 500 kW централа и батерии</h3>
                <p className="mt-4 max-w-xl leading-8 text-white/85">
                  Фотоволтаичната система на стопанството включва соларна централа и система за
                  съхранение на енергия, които позволяват по-голяма ефективност и енергийна независимост.
                </p>
              </div>

              <div className="rounded-[2.25rem] border border-[#e6dece] bg-[#fbfaf6] p-8 shadow-[0_20px_60px_rgba(20,90,42,0.07)] transition hover:-translate-y-1">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#145a2a]">
                  Съхранение на енергия
                </p>
                <h3 className="mt-4 text-3xl font-black text-[#14311f]">
                  Батерийна система за по-висока ефективност
                </h3>
                <p className="mt-4 max-w-xl leading-8 text-stone-700">
                  Системата за съхранение на електроенергия подпомага по-доброто управление на
                  произведената енергия, повишава ефективността и допринася за по-голяма енергийна
                  независимост на стопанството.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="notill" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div className="rounded-[2.5rem] bg-[linear-gradient(180deg,#163f27,#102f1d)] p-10 text-white shadow-[0_30px_80px_rgba(16,61,34,0.25)]">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/70">No-Till</p>
                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                  Устойчиво земеделие без излишна намеса в почвата
                </h2>
                <p className="mt-6 max-w-xl leading-8 text-white/85">
                  No-till технологията е в основата на нашата работа. Чрез минимална обработка на
                  почвата съхраняваме влагата, ограничаваме ерозията и поддържаме по-добра почвена
                  структура в дългосрочен план.
                </p>
              </div>

              <div className="rounded-[2.5rem] border border-[#e5ddcc] bg-white p-8 shadow-[0_20px_60px_rgba(20,90,42,0.08)]">
                <h3 className="mb-6 text-2xl font-black text-[#14311f]">Предимства</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="rounded-2xl border border-[#eee6d7] bg-[#faf8f3] px-5 py-4 text-sm font-medium leading-6 text-stone-700"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="map" className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#145a2a]">
                Локация
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#14311f] md:text-5xl">
                Google Maps
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-stone-700">
                Нашата база и основна дейност се развиват в този регион. Локацията позволява ефективна логистика, работа със земеделска техника и партньорства със земеделски и търговски компании.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-[#e6dece] bg-white p-3 shadow-[0_20px_60px_rgba(20,90,42,0.08)]">
              <div className="aspect-[16/9] overflow-hidden rounded-[2rem]">
                <iframe
                  title="Google Maps location"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d92434.62403006021!2d26.6716645!3d43.6152442!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40af9f004e762c01%3A0x3fd39bdf76c3822d!2z0KDQsNC50LrQvtCyINCQ0LPRgNC-INCV0J7QntCU!5e0!3m2!1sbg!2sbg!4v1773074379741!5m2!1sbg!2sbg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#145a2a,#103d22)] shadow-[0_35px_90px_rgba(16,61,34,0.25)]">
              <div className="grid gap-8 p-8 text-white lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/70">
                    Контакти
                  </p>
                  <h2 className="mt-4 text-3xl font-black md:text-5xl">Свържете се с нас</h2>
                  <p className="mt-5 max-w-xl leading-8 text-white/85">
                    За актуални количества, условия за доставка и възможности за партньорство,
                    изпратете запитване или се свържете директно с нас.
                  </p>

                  <div className="mt-8 space-y-4 text-base text-white/90">
                    <p><span className="font-bold text-white">Фирма:</span> RAYKOV NO-TILL AGRO ЕООД</p>
                    <p><span className="font-bold text-white">Телефон:</span> +359 8XX XXX XXX</p>
                    <p><span className="font-bold text-white">Имейл:</span> office@example.bg</p>
                    <p><span className="font-bold text-white">Регион:</span> България</p>
                    <p><span className="font-bold text-white">Локация:</span> Вижте ни на картата по-долу</p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
                >
                  <div className="grid gap-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/90">Име</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Вашето име"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition focus:border-[#e8dfcb]"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-200">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/90">Имейл</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Вашият имейл"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition focus:border-[#e8dfcb]"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-200">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/90">Съобщение</label>
                      <textarea
                        rows="5"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Напишете вашето запитване"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition focus:border-[#e8dfcb]"
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-200">{errors.message}</p>
                      )}
                    </div>

                    {successMessage && (
                      <div className="rounded-xl border border-emerald-200/30 bg-emerald-100/10 px-4 py-3 text-sm text-emerald-100">
                        {successMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="rounded-xl bg-[#e8dfcb] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[#103d22] transition hover:opacity-90"
                    >
                      Изпрати запитване
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7dfd0] bg-[#f8f5ee]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 RAYKOV NO-TILL AGRO ЕООД. Всички права запазени.</p>
          <p>Пшеница • Слънчоглед • Ечемик • Царевица • Сливи</p>
        </div>
      </footer>
    </div>
  )
}