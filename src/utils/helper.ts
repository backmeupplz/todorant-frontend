export async function playSound(audioName: string) {
  const audioFile = new Audio(audioName)
  return audioFile.play()
}

export enum Sounds {
  taskDone = 'audio/task_done.mp3',
  frogDone = 'audio/splat.mp3',
  dayDone = 'audio/day_compele.mp3',
}
