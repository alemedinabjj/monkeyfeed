import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'
import { AvatarProps } from '../types/Avatar';

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {

  const initials = props.name
  ?.split(' ')
  ?.slice(0, 2)
  ?.map(word => word[0])
  ?.join('');

  return (
    <div className={hasBorder ? styles.avatarWithBorder : styles.avatar} {...props}>
      {initials && initials}
    </div>
  )
}