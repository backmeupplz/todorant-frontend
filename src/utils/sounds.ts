import store from '@/store'

export async function playSound(audioName: Sounds) {
  if (!(store as any).state.SettingsStore.audioEnabled) {
    return
  }
  if (audioName === Sounds.levelUp && Math.floor(Math.random() * 10) === 0) {
    audioName = Sounds.nice
  }
  const audioFile = new Audio(audioName)
  audioFile.volume = 0.3
  return audioFile.play()
}

export enum Sounds {
  taskDone = 'audio/task_done.mp3',
  levelUp = 'audio/level_up.mp3',
  nice = 'audio/nice.mp3',
}
