import LoadingComponent from '@/components/loading/loading'

export default function Loading () {
  const user = "of the user you selected"

  return(<LoadingComponent page={user} />)
}