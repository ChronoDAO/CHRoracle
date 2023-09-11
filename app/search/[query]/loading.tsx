import LoadingComponent from '@/components/loading/loading'

export default function Loading () {
  const searchUser = "Searching for users..."

  return(<LoadingComponent page={searchUser} />)
}