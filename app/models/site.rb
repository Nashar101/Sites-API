class Site < ApplicationRecord
  validates :url, presence: true, length: {maximum: 200}
  validates :duration, presence: true, length: {maximum: 9}


end
