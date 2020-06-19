export async function playSound(audioName: string) {
  const audioFile = new Audio(audioName)
  audioFile.volume = 0.3
  return audioFile.play()
}

export enum Sounds {
  taskDone = 'audio/task_done.mp3',
  frogDone = 'audio/splat.mp3',
}
