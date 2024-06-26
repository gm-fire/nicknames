<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace GmFire\Nicknames;

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Flarum\Search\GambitInterface;
use Flarum\Search\SearchState;
use Flarum\User\UserRepository;

class NicknameFullTextGambit implements GambitInterface
{
    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @param \Flarum\User\UserRepository $users
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * @param $searchValue
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function getUserSearchSubQuery($searchValue)
    {
        return $this->users
            ->query()
            ->select('id')
            ->where('username', 'like', "{$searchValue}%")
            ->orWhere('nickname', 'like', "{$searchValue}%");
    }

    /**
     * {@inheritdoc}
     */
    public function apply(SearchState $search, $searchValue)
    {
        $search->getQuery()
            ->whereIn(
                'id',
                $this->getUserSearchSubQuery($searchValue)
            );

        return true;
    }
}
