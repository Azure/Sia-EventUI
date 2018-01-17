import React from 'react'
import Badge from 'material-ui/Badge'

const styles = {
  badge: {
    padding: 0
  },
  badgeposition: {
    top: -4,
    right: -12,
    width: 16,
    height: 16
  }
}

export const BadgeStyled = ({badgeContent, primary = true, children}) => {
  return (
    <Badge
      badgeContent={badgeContent}
      badgeStyle={styles.badgeposition}
      style={styles.badge}
      primary={primary}
      secondary={!primary}
        >
      {children}
    </Badge>
  )
}

export default BadgeStyled
