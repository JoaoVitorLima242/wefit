import { useNavigation } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'

// Types
import { IRepo } from '../../../types/repo'
// Components
import Title from '../Title'
import Button from '../../UI/Button'
import TextWithIcon from '../../UI/TextWithIcon'
// Styles
import * as S from './styles'
import { defaultTheme } from '../../../styles/theme'
// Contexts
import RepoContext from '../../../contexts/Repos'

interface MyProps {
  repo: IRepo
}

const RepoCard = ({
  repo
}: MyProps) => {
  const navigation = useNavigation()
  const { addToFavoritesHandler, favorites } = useContext(RepoContext)

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const index = favorites.findIndex(prevRepo => prevRepo.id === repo.id)
    const exist = index >= 0

    setIsFavorite(exist)
  }, [favorites])

  const {
    full_name,
    description,
    stargazers_count,
    language,
    html_url,
    id,
    owner
  } = repo

  const buttonBackground = defaultTheme.colors.yellowLight
  const favoriteColor = defaultTheme.colors.yellow
  const languageIconColor = defaultTheme.colors.red

  const onPressWrapperHandler = () => {
    navigation.navigate('Details', {
      full_name,
      description,
      stargazers_count,
      language,
      html_url,
      id,
      owner
    })
  }

  const onFavoriteHandler = () => {
    addToFavoritesHandler(repo)
  }

  return (
    <S.Wrapper
      onPress={onPressWrapperHandler}
      activeOpacity={0.7}
    >
      <S.TitleSection>
        <Title fullName={full_name}/>
        <S.Image source={owner.avatar_url ? { uri: owner.avatar_url } : require('../../../assets/smallLogo.png')}/>
      </S.TitleSection>
      {description &&
        <S.InfoSection>
          <S.DescriptionText>{description}</S.DescriptionText>
        </S.InfoSection>
      }
      <S.FooterSection>
        {
          !isFavorite &&
          <Button
            backgroundColor={buttonBackground}
            color={favoriteColor}
            text='Favoritar'
            icon='star'
            onPress={onFavoriteHandler}
          />

        }
        <TextWithIcon
          icon='star'
          iconColor={favoriteColor}
          iconSize={16.67}
          text={stargazers_count ?? 0}
        />
        <TextWithIcon
          text={language}
          iconColor={languageIconColor}
          iconSize={8}
          icon='circle'
        />
      </S.FooterSection>
    </S.Wrapper>
  )
}

export default RepoCard
